<script lang="ts">
const { name, href } = $props();
</script>

<a {href}>
	<div class="border-8 border-amber-900">
		<div
			class="flex flex-col items-center justify-start h-48 w-28 md:h-96 md:w-52 bg-amber-900 border-4 border-amber-800 p-1 pt-2 md:p-5"
		>
			<div class="bg-mist-300 md:p-1 md:px-4 text-center w-20 md:w-40">
				<span class="text-sm md:text-xl font-mono">
					{name}
				</span>
			</div>
			<div class="bg-slate-200 w-20 md:w-40 h-12 md:h-24 m-2 md:m-5"></div>
			<div class="w-full flex justify-end mr-2 md:mr-0 md:my-5">
				<div
					class="size-2 md:size-4 bg-radial from-white to-stone-200 rounded-full"
				></div>
			</div>
		</div>
	</div>
</a>
