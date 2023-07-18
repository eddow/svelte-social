export function toQuery(params: Record<string, string|number>, separator: string, encode = (x:string|number)=>x) {
	return Object.entries(params).map(([key, value]) => `${key}=${encode(value)}`).join(separator);
}
export function fromQuery(query: string, separator: string, decode = (x:string)=>x) {
	return query.split(separator).reduce((acc, cur) => {
		const [key, value] = cur.split('=');
		acc[key] = decode(value);
		return acc;
	}, {} as Record<string, string>);
}