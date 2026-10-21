<script lang="ts">
import type { HTMLAnchorAttributes } from "svelte/elements";
import { internalLinkStyle } from "../../lib/link";
import { cn } from "../../lib/utils";

let {
	class: className = "",
	children,
	...props
}: HTMLAnchorAttributes = $props();
</script>

<!-- biome-ignore lint/a11y/useValidAnchor: content provided by Slot -->
<a class={cn(internalLinkStyle, className)} {...props}>
	{@render children?.()}
</a>
