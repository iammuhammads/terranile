import type {NextConfig} from 'next';

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects(){
    return [
      {source:'/companies',destination:'/projects/',permanent:true},
      {source:'/companies/avan',destination:'/avan/',permanent:true},
      {source:'/404',destination:'/page-not-found/',permanent:false}
    ];
  }
};
export default config;
