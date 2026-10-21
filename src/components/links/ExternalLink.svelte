<script lang="ts">
import { ExternalLink as ExternalLinkIcon } from "@lucide/svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { externalLinkStyle } from "../../lib/link";
import { cn } from "../../lib/utils";

let {
	class: className = "",
	children,
	...props
}: HTMLAnchorAttributes = $props();
</script>

<!-- biome-ignore lint/a11y/useValidAnchor: content provided by Slot -->
<a
	target="_blank"
	rel="noopener noreferrer"
	class={cn(externalLinkStyle, className)}
	{...props}
>
	{@render children?.()}
	<ExternalLinkIcon />
</a>
