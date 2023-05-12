import React,{useState, useContext} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CategoriesContext from "../Context/CategoriesContext";

const AddNewCategory=(props)=>{

  const context = useContext(CategoriesContext);
  const { addCategory } = context; // destructuring

    const [category, setCategory] = useState(null);
    const [msg, setMsg] = useState();

    const onChangeEventHandler = (event) => {
        setCategory(event.target.value);
      }
      
      const handleSave = async(event) => {
        event.preventDefault();
        if (!category ||!containsOneAlphabet(category)) {
          setMsg("Category can't be empty");
        }else {
          setMsg(null);
          const result= await addCategory(category)
          if(result){
            onClose()
          }
          else{
            setMsg("Another category already exists under the same name.");
          }
        }
      }
    
      const containsOneAlphabet=(str)=>{
        const regex = /[a-zA-Z]/;
        if (regex.test(str)) {
          return true; //string  contains at least one alphabet
        } else {
          return false; //string does not contain any alphabet
        }
      }
      const onClose = () => {
        setMsg(null);
        setCategory(null);
        props.closeModal();
      };

    return(
        <Dialog open={props.open} onClose={onClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter a category relavent to your Business.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Category"
                type="names"
                fullWidth
                variant="standard"
                onChange={onChangeEventHandler}
            />
            <div> <span className="link-danger" id='errorCategory'>{msg}</span></div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
      </Dialog>
)}

export default AddNewCategory