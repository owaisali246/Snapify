import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = new sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-11-16',
    useCdn: true,
    token: process.env.SANITY_TOKEN,
})

const builder = imageUrlBuilder(client);

export const uelFor = (source) => builder.imageUrl(source);