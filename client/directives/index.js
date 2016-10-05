export function addactive(el, binding){
	if (binding.value.vflag) {
		el.className = binding.value.elclass+' '+binding.value.classname
	} else {
		el.className = binding.value.elclass
	}
}