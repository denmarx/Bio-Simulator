

export class Water{
	ph;
	temperature;

	/**
	 * 
	 * @param {int} ph 
	 * @param {int} temp 
	 */
	constructor(ph, temp){
		this.ph = ph;
		this.temperature = temp;
	}

	/**
	 * 
	 * @param {int} ph 
	 */
	setPh(ph){
		this.ph = ph;
		console.log("new ph value:", ph);
	}
}