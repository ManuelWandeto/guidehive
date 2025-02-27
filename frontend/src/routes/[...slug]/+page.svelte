<script lang="ts">
    import MarkdownRenderer from '$lib/components/markdown_renderer.svelte';
    import type {PageProps} from './$types';
    import {PUBLIC_PROJECT} from '$env/static/public';

    const {data}: PageProps = $props();
</script>

<svelte:head>
	<title>{PUBLIC_PROJECT} | {data.data[0].title}</title>
</svelte:head>

<MarkdownRenderer mdContent = {data.data[0].content}/>