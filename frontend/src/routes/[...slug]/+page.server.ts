import type { PageApiResponse, SectionApiResponse } from "$lib/interfaces/doc";
import type { PageServerLoad } from "./$types";
import { error, redirect } from '@sveltejs/kit';
import {APP_ENV, DEV_API_URL, PROD_API_URL} from '$env/static/private';


export const load: PageServerLoad = async ({fetch, params, parent}) => {
    const api_url = APP_ENV === 'development' ? DEV_API_URL : PROD_API_URL;

    if(!params.slug?.trim()) {
        const {data} = await parent()
        throw redirect(308, `./${data[0].slug}`)
    }
    try {
        const slug = params.slug?.split('/').pop()
        // try find a section first
        const sectionRes = await fetch(`${api_url}/api/sections?filters[slug][$eq]=${slug}`)
        const section: SectionApiResponse = await sectionRes.json()
        if(section.data.length) {
            return section;
        }
        // if not find a page
        const pageRes = await fetch(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}`)
        const page:PageApiResponse = await pageRes.json();

        if(page.data.length) {
            return page;
        }
        error(404, 'NOT FOUND')
    } catch (e) {
        console.log(e)
        error(500, `Internal error getting page: ${e}`)
    }
}