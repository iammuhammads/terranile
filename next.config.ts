import type {NextConfig} from 'next';

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects(){
    return [
      ...['www.terranile.com','terranile.vercel.app'].flatMap(host=>[
        {source:'/:path(.*\\.[^/]+)',has:[{type:'host' as const,value:host}],destination:'https://terranile.com/:path',permanent:true},
        {source:'/:path*',has:[{type:'host' as const,value:host}],destination:'https://terranile.com/:path*/',permanent:true}
      ]),
      {source:'/companies',destination:'/projects/',permanent:true},
      {source:'/companies/avan',destination:'/avan/',permanent:true}
    ];
  }
};
export default config;
