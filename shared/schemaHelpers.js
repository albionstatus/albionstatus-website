export const encodeAnswer = answer => answer.replace(/"/g, '\'').replace(/\\n/g, '').trim()
