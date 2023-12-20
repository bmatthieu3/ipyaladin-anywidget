import A from "https://esm.sh/aladin-lite@3.2.0";


export function render({model, el}) {

    A.init.then(() => {


        const height = () => model.get("height");
        el.setAttribute("style",`width:100%;height:${height()}px;`);
        el.id = 'aladin-lite-div';
        console.log(el);

        A.aladin('#aladin-lite-div', {projection: "TAN", target: '15 16 57.636 -60 55 7.49', showCooGrid: true, fov: 90});
        console.log(el);
        

    })

}