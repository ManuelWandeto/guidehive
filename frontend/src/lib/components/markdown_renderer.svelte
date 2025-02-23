<script lang="ts">
  import { marked } from 'marked';
  const {mdContent} = $props()
  let isLoaded = $state(false);
  let htmlContent: HTMLElement;

  $effect(()=>{
    (async () => {
      htmlContent.innerHTML = await marked(mdContent);
    })().then(()=>{
      isLoaded = true;
    }).catch(e=>console.log(e))
  })
</script>
{#if !isLoaded} 
  <div class="flex w-5/6 flex-col gap-4 p-6">
    <!-- <div class="skeleton h-32 w-full"></div> -->
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
  </div>
{/if}
<article class="prose lg:prose-lg xl:prose-xl max-w-none px-5 py-4" bind:this={htmlContent}></article>