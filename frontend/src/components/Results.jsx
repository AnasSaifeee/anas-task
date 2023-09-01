import React,{useState,useEffect} from 'react'
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPhotosAsync } from '../features/fetchphotos';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
const Results = () => {
    const params=useParams()
    const {query}=params
    const [open, setOpen] = React.useState(false);
    const [detail,setDetail]=useState([])
  const dispatch=useDispatch()

  const {response, loading}=useSelector(state=>state.fetchphotos)
  const [photos, setPhotos] = useState([]);
  const [gridColumns, setGridColumns] = useState(3);
  const styles = {
    gridItem: {
      width: `calc(100% / ${gridColumns})`,
      padding:"2px",
      cursor: 'pointer',
      
    },
  };

  useEffect(()=>{
    dispatch(fetchPhotosAsync(query))

  },[])
    const handleClickOpen = (photo) => {
        console.log(photo.photographer)
     setDetail(photo)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(()=>{
        if(response.photos)
        {
           setPhotos(response.photos)
        }
       
       },[response])
  return (
    <>
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
  <div className=" flex justify-center bg-slate-100 mt-4">
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
  <div className="flex flex-wrap justify-center">
    
    {loading &&
  Array.from({ length: gridColumns }).map((_, index) => (
    <div key={index} className={`w-1/${gridColumns} p-1`}>
      <Skeleton variant="rectangular" width={1200/gridColumns} height={800/gridColumns}  /> <br />
      <Skeleton variant="rectangular" width={1200/gridColumns} height={800/gridColumns} /> 
    </div>
  ))
}

  {!loading && photos && photos.map((photo) => 
  {
    return(

      <>
      <div style={styles.gridItem} onClick={() => handleClickOpen(photo)}>
          <img src={photo.src.original} className='px-2 py-2' alt="" width="500px"  />
        </div>

  
      </>
    )
  }
  )}
   {!loading && !photos.length && <div className=' h-96 pt-44 flex justify-center items-center' >
    <h1 className='text-4xl font-medium' >No Results Found for "{query}"!</h1>
    </div>}
</div>
    </>
  )
}

export default Results