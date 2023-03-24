export default class Event0 {
	static fix(mini_e) {
		mini_e.preventDefault = () => {}
		mini_e.stopPropagation = () => {}
		return mini_e

	}
}
