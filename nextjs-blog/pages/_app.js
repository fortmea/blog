import '../styles/global.css'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <>
      {pageLoading
        ? (<div className="lds-ripple center" style={{width:"2000px", color:"blue", }}><div></div><div></div><div></div><div></div></div>)
        : <Component {...pageProps} />
      }
    </>
  );
}

export default App;
