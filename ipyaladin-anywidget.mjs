import A from "https://esm.sh/aladin-lite@3.2.0";

let idxView = 0

export function render({model, el}) {

    A.init.then(() => {

        let height = model.get("height");
        let target = model.get("target");

        el.setAttribute("style",`width:100%;height:${height}px;`);
        el.id = `aladin-lite-div-${idxView}`;

        let aladin = new A.aladin(`#aladin-lite-div-${idxView}`, {projection: "TAN", target: target, showCooGrid: true, fov: 90});

        
        aladin.on("positionChanged", (position) => {
          model.set('ra', position.ra);
          model.set('dec', position.dec);
          console.log(model.get('ra'), ' ' ,model.get('dec'))
          model.save_changes();
        })

        model.on("change:height", () => {
            height = model.get("height");
            el.style.height = `${height}px`;
        });

        model.on("change:target", () => {
          target = model.get("target");
          
          aladin.gotoObject(target)

          console.log(aladin.getRaDec())
        })

        el.appendChild(aladin);

    });
    
}
