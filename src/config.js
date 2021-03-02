export const production = true; // set it to true when deploy to the server

const domain = `educloud-mern.herokuapp.com`; // if you have domain pointed to digitalOcean Cloud server let use your domain.eg: tabvn.com
export const websocketUrl = `ws://${domain}`
export const apiUrl = `https://${domain}`