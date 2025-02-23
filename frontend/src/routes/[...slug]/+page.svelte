<script lang="ts">
    import MarkdownRenderer from '$lib/components/markdown_renderer.svelte';
    import type {PageProps} from './$types'
    const {data}: PageProps = $props();

</script>

<svelte:head>
	<title>Hotelex - {data.data[0].title}</title>
</svelte:head>

<MarkdownRenderer mdContent = {data.data[0].content}/>