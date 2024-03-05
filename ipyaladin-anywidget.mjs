import A from "https://esm.sh/aladin-lite@3.3.0-beta";

let idxView = 0

async function initialize({ model }) {
  await A.init;
}

function render({model, el}) {
  let height = model.get("height");
  let target = model.get("target");

  let aladinDiv = document.createElement('div');
  aladinDiv.style.height = `${height}px`;

  aladinDiv.id = `aladin-lite-div-${idxView}`;
  // el is not inserted into the DOM. Thus we first directly insert it into the document
  document.body.appendChild(aladinDiv);
  // then we create the aladin lite instance. It will find the div because it is inserted in the DOM
  // TODO: this is a bad workaround, I need to remove the document.querySelector in aladin-lite
  // and only refer to the div given instead.
  let aladin = new A.aladin(aladinDiv, {showLayersControl: true, showFullscreenControl: false, showContextMenu: true, projection: "TAN", target, fov: 90});
  idxView += 1;

  // At this point we remove it from the DOM
  aladinDiv.remove();
  // And append it to el
  el.appendChild(aladinDiv)
  
  aladin.on("positionChanged", (position) => {
    model.set('ra', position.ra);
    model.set('dec', position.dec);
    console.log(model.get('ra'), ' ' ,model.get('dec'))
    model.save_changes();
  })

  model.on("change:height", () => {
      let height = model.get("height");
      aladinDiv.style.height = `${height}px`;
  });

  model.on("change:target", () => {
    let target = model.get("target");
    
    aladin.gotoObject(target)

    console.log(aladin.getRaDec())
  })
}

export default { initialize, render }
