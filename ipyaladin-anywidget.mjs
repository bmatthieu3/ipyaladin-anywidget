import A from "./node_modules/aladin-lite";

await A.init;

let idxView = 0;
export function render({model, el}) {
    // 
    if (this.div) {
        this.el.remove(this.div);
    }

    const height =() => model.get("height");

    this.div = document.createElement('div');
    this.div.id = `aladin-lite-div${parseInt(idxView)}`;
    idxView++;
    // creates the div section, height is fixed by the user or defaults to 400px
    
    this.div.setAttribute("style",`width:100%;height:${height()}px;`);

    this.el.appendChild(this.div);

}