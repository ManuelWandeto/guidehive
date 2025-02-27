import type { LayoutServerLoad } from "./$types";
import type {ApiResponse} from "$lib/interfaces/doc";
import { error } from '@sveltejs/kit';
import {APP_ENV, DEV_API_URL, PROD_API_URL} from '$env/static/private';
import {PUBLIC_PROJECT} from '$env/static/public';
import {stringify} from 'qs';

export const load: LayoutServerLoad = async({fetch})=>{
    const api_url = APP_ENV === 'development' ? DEV_API_URL : PROD_API_URL;
    try {
        const query = stringify({
            filters: {
                is_sub_section: { $ne: 'true' },
                project: {
                    name: {
                        $eq: PUBLIC_PROJECT
                    }
                }
              },
            populate: {
              sub_sections: {
                sort: ['sidebar_position:asc'],
                fields: ['title', 'slug'],
                populate: {
                  pages: {
                    sort: ['sidebar_position:asc'],
                    fields: ['title', 'slug']
                  }
                }
              },
              pages: {
                sort: ['sidebar_position:asc'],
                fields: ['title', 'slug']
              },
              project: {
                fields: ['name']
              },
            },
            sort: ['sidebar_position:asc'],
            fields: ['title', 'slug']
          }
        )
        const res = await fetch(`${api_url}/api/sections?${query}`)
        const data: ApiResponse = await res.json()
    
        return data;
    } catch (e) {
        error(500, `An error occured: ${e}`)
    }
}