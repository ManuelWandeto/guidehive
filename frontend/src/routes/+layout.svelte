<script lang="ts">
	import '../app.css';
	import type {LayoutProps} from './$types';
  import { page as currentPage } from '$app/state';
  import {theme} from '$lib/stores/theme';
  import logo from '$lib/assets/company_logo.png'
  import {PUBLIC_PROJECT, PUBLIC_BRAND_NAME} from '$env/static/public';
  import {base} from '$app/paths';

	let { data, children }: LayoutProps = $props();
  
  // Create a reactive derived variable for segments
  const segments = $derived(currentPage.url.pathname.split('/').filter(Boolean));

  const currentSlug = $derived(segments[segments.length - 1]);

  $effect(()=>{
    document.querySelector('html')?.setAttribute('data-theme', $theme);
  })
</script>

<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-base-100 shadow-sm sticky top-0">
        <div class="flex-none">
          <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
          </label>
        </div>
        <div class="flex-1">
          <span class="btn btn-ghost text-xl">{PUBLIC_PROJECT}</span>
        </div>
        <div class="flex-none">
          <button aria-label="theme-toggle" >
              
            <label class="toggle text-base-content">
              <input type="checkbox" value="synthwave" class="theme-controller" onclickcapture="{()=>{
                $theme = $theme === 'dark' ? 'lofi' : 'dark'
              }}" checked={$theme === 'dark'}>
            
              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
            
              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
            
            </label>
          </button>
        </div>
      </div>
      
      <!-- Page content here -->
      <div class="breadcrumbs text-sm text-left pl-5 mt-3">
        <ul>
          {#each segments as segment}
            <li>{segment}</li>
          {/each}
        </ul>
      </div>
    
      {@render children()}

      <footer class=" text-gray-200 py-4">
        <div class="max-w-7xl mx-auto px-4">
          <p class="text-center text-sm">&copy; 2025 Kingsoft Company. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      
      
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-base md:text-lg xl:text-xl 2xl:text-2xl">
        <!-- Sidebar content here -->
         <li>
          <a href="/" class="flex items-center p-2 ">
            <!-- Logo Image: adjust the src to your logo path -->
            <img src={logo} alt="Company Logo" class="h-10 w-auto sm:h-10" />
            <!-- Brand Name: hidden on small screens, visible on md and larger -->
            <span class="hidden md:inline ml-2 text-xl font-bold">
              {PUBLIC_BRAND_NAME}
            </span>
          </a>
          <hr>
         </li>
        {#each data.data as section (section.documentId)}
          <li>
            {#if !section.pages.length && !section.sub_sections.length} 
              <a class="{currentSlug === section.slug ? 'menu-active' : ''}" href="{base}/{section.slug}">{section.title}</a>
            {:else}
            <details open>
              <summary><a class="{currentSlug === section.slug ? 'menu-active' : ''}" href="{base}/{section.slug}">{section.title}</a></summary>
              {#if section.pages?.length}
                <ul class="menu text-base md:text-lg 2xl:text-xl w-full">
                  {#each section.pages as page}
                    <li><a class="{currentSlug === page.slug ? 'menu-active' : ''}" href="{base}/{section.slug}/{page.slug}">{page.title}</a></li>
                  {/each}
                </ul>
              {/if}
              {#if section.sub_sections.length}
                <ul class="menu text-base md:text-lg 2xl:text-xl w-full">
                  {#each section.sub_sections! as sub_sections}
                    <li>
                      <details open>
                        <summary><a class="{currentSlug === sub_sections.slug ? 'menu-active' : ''}" href="{base}/{section.slug}/{sub_sections.slug}">{sub_sections.title}</a></summary>
        
                        {#if sub_sections.pages?.length}
                          <ul class="menu text-base md:text-lg 2xl:text-xl w-full">
                            {#each sub_sections.pages as page}
                              <li><a class="{currentSlug === page.slug ? 'menu-active' : ''}" href="{base}/{section.slug}/{sub_sections.slug}/{page.slug}">{page.title}</a></li>
                            {/each}
                          </ul>
                        {/if}
                      </details>
                    </li>
                  {/each}
                </ul>
              {/if}
            </details>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
