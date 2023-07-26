import React from "react"
import InventoryForm from "./inventoryform";
import {Button} from "antd";
function Inventory() {
   const[open,setOpen]=React.useState(false);
    return (
        <div>
        <div className="flex justify-end">
            <Button type="primary" onClick={() => setOpen(true)}>Add Inventory</Button>
        </div>
        {open && <InventoryForm open={open} setOpen={setOpen}/>}
        </div>
    );
}

export default Inventory;