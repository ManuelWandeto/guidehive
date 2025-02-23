import type { LayoutServerLoad } from "./$types";
import type {ApiResponse} from "$lib/interfaces/doc";
import { error } from '@sveltejs/kit';
import {APP_ENV, DEV_API_URL, PROD_API_URL} from '$env/static/private';

export const load: LayoutServerLoad = async({fetch})=>{
    const api_url = APP_ENV === 'development' ? DEV_API_URL : PROD_API_URL;
    try {
        const res = await fetch(`${api_url}/api/sections?filters[is_sub_section][$ne]=true&populate[sub_sections][fields][0]=title&populate[sub_sections][fields][1]=slug&populate[sub_sections][populate][pages][fields][0]=title&populate[sub_sections][populate][pages][fields][1]=slug&populate[pages][fields][0]=title&populate[pages][fields][1]=slug&fields[0]=title&fields[1]=slug`)
        const data: ApiResponse = await res.json()
    
        return data;
    } catch (e) {
        error(500, `An error occured: ${e}`)
    }
}