import React, { useEffect, useState } from 'react';
import { fetchPhotosAsync } from '../features/fetchphotos';
import { useDispatch,useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
function PhotoSearch() {
 
    const [open, setOpen] = React.useState(false);
    const [detail,setDetail]=useState([])
    const [show,setShow]=useState(false)
    const [search,setSearch]=useState("")
    const handleClickOpen = (photo) => {
        console.log(photo.photographer)
     setDetail(photo)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [gridColumns, setGridColumns] = useState(3);
  const dispatch=useDispatch()
  const {response, loading}=useSelector(state=>state.fetchphotos)
  const searchPhotos = async () => {
    dispatch(fetchPhotosAsync(query))
  };
  const styles = {
    gridItem: {
      width: `calc(100% / ${gridColumns})`,
      padding:"2px",
      // paddingTop:"20px",
      cursor: 'pointer',
      
    },
  };
useEffect(()=>{
 if(response.photos)
 {
    setPhotos(response.photos)
 }

},[response])
useEffect(()=>{
    dispatch(fetchPhotosAsync("random"))
},[])

  return (

    <div className="flex flex-col items-center">
        <div>
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Image Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <strong>Photographer Name</strong> : {detail && detail.photographer} <br />
            <strong>Photographer Url</strong> : {detail && <a className='text-blue-500' href= {detail.photographer_url}>{detail.photographer_url}</a> } <br />
            <strong>Photographer Id</strong> : {detail && detail.photographer_id} <br />
            <strong>Original height</strong> : {detail && detail.height} <br />
            <strong>Original width</strong> : {detail && detail.width}
          </Typography>
          
        </DialogContent>
    
      </BootstrapDialog>
    </div>
    <header className="w-full bg-gray-200 p-4 text-center">
      <div className="mt-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for photos"
          className="px-2 py-1 rounded border outline-none"
        
        />
        <button
          onClick={searchPhotos}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
      <label className="mr-2">Change Grid:</label>
      <select
        value={gridColumns}
        onChange={(e) => setGridColumns(Number(e.target.value))}
        className="px-2 py-1 rounded border"
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
    </header>
   
    <div className="flex flex-wrap justify-center">
    
    {loading &&
  Array.from({ length: gridColumns }).map((_, index) => (
    <div key={index} className={`w-1/${gridColumns} p-1`}>
      <Skeleton variant="rectangular" width={1200/gridColumns} height={800/gridColumns}  /> <br />
      <Skeleton variant="rectangular" width={1200/gridColumns} height={800/gridColumns} /> 
    </div>
  ))
}

  {!loading && photos.map((photo) => 
  {
    return(

      <>
      
      <div style={styles.gridItem} onClick={() => handleClickOpen(photo)}>
          <img src={photo.src.original} className='px-2 py-2' alt="" width="500px" />
        </div>

  
      </>
    )
  }
  )}
</div>


 
  </div>
  );
}

export default PhotoSearch;
