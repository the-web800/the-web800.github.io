<script lang="ts">
    const {
        children,
        borderColor = "border-gray-200",
        isActive = false,
    } = $props();
</script>

<div
    class="w-10 h-10 text-lg border-2 {borderColor} rounded-md flex items-center justify-center m-2 bg-black {isActive
        ? 'text-amber-400 text-shadow-lg/20'
        : 'text-gray-300'} text-shadow-orange-600 font-semibold"
>
    {@render children()}
</div>
