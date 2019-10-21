import React from "react";



export default class Home extends React.Component {



    loadScript = (url)=>{
        let index = window.document.getElementsByTagName('script')[0];
        let script = window.document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        index.parentNode.insertBefore(script,index);
    }
    

    render(){
        return (
            <section>
                <h1> Home Page </h1>
                <p> Welcome to the best app ever! ❤️ </p>
            </section>
        )
    }
}