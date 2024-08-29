import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import darkMode from "@/assets/darkMode.svg";
import lightMode from "@/assets/lightMode.svg";
import { useEffect, useState } from 'react';

export default function Guest({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
      const handleRemoveDarkMode = () => {
        const htmlEle = document.querySelector('html');
        if (htmlEle.classList.contains('dark')) {
          htmlEle.classList.remove('dark');
          setIsDarkMode(false);
          localStorage.setItem('theme', 'light');
        }
      };
    
      const handleAddDarkMode = () => {
        const htmlEle = document.querySelector('html');
        if (!htmlEle.classList.contains('dark')) {
          htmlEle.classList.add('dark');
          setIsDarkMode(true);
          localStorage.setItem('theme', 'dark'); 
        }
      };


      useEffect(()=>{
        const theme = localStorage.getItem("theme");
  
        if(theme){
          if(theme == "light"){
            const htmlEle = document.querySelector('html');
            if (htmlEle.classList.contains('dark')){
              htmlEle.classList.remove('dark');
            }
            setIsDarkMode(false);
          }
          else{
              const htmlEle = document.querySelector('html');
            if (!htmlEle.classList.contains('dark')) {
              htmlEle.classList.add('dark');
            }
          }
        }
        else{
          const htmlEle = document.querySelector('html');
          if (!htmlEle.classList.contains('dark')) {
              htmlEle.classList.add('dark');
            }
        }
        }, [])

    return (
        <div className="min-h-screen flex flex-col items-center pt-6 bg-gray-100 dark:bg-gray-900">
            <div className=' w-[95%] mx-auto flex justify-start items-start'>
                {
                    isDarkMode?  <button onClick={handleRemoveDarkMode}>
                        <img src={lightMode} alt="" width={28} />
                    </button>

                    : 

                    <button onClick={handleAddDarkMode}>
                        <img src={darkMode} alt="" width={25} />
                    </button>
                }

            </div>


            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
