import React,{useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddNewCategory=(props)=>{

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
          //code to save category
          const response = await fetch("http://localhost:8000/addNewCategory", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({category:category})
            });
          const jsonResponse = await response.json()
          //If ctegory is successfully added to db --> call the onClose function to close the modal
          if(jsonResponse._id){
            props.addCategoryHandler(jsonResponse)
            onClose()
          }
          //If there is some error while adding the category
          else{
            setMsg(jsonResponse.error);
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
        props.onClose();
      };

    return(
        <Dialog open={props.isOpen} onClose={onClose}>
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