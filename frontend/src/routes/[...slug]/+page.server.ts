import type { PageApiResponse, SectionApiResponse } from "$lib/interfaces/doc";
import type { PageServerLoad } from "./$types";
import { error, redirect } from '@sveltejs/kit';
import {APP_ENV, DEV_API_URL, PROD_API_URL} from '$env/static/private';
import {PUBLIC_BASE_URL} from '$env/static/public';


export const load: PageServerLoad = async ({fetch, params, parent, url}) => {
    const api_url = APP_ENV === 'development' ? DEV_API_URL : PROD_API_URL;

    if(!params.slug?.trim()) {
        const {data} = await parent()
        const redirectUrl = `.${PUBLIC_BASE_URL}/${data[0].slug}`
        
        throw redirect(307, redirectUrl)
    }
    const slug = params.slug?.split('/').pop()
    // try find a section first
    const sectionRes = await fetch(`${api_url}/api/sections?filters[slug][$eq]=${slug}`)
    const section: SectionApiResponse = await sectionRes.json()
    if(section.data.length) {
        return section;
    }
    // if not find a page
    const pageRes = await fetch(`${api_url}/api/pages?filters[slug][$eq]=${slug}`)
    const page:PageApiResponse = await pageRes.json();

    if(page.data.length) {
        return page;
    }
    error(404, 'NOT FOUND')
}