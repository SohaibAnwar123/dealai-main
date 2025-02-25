import React from 'react'
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
const Required = () => (
    <div className='preference-body'>
    <div className='iconParent'>
       <Typography fontSize={"30px"} color={"#0D3EBA"} fontWeight={500}  sx={{marginBottom:"48px"}}>Required to Disclose By Law</Typography>
    
            </div> 
            
            <>
    
       <Typography fontSize={"24px"} color={"#353535"} fontWeight={400} sx={{maxWidth:"1488px",marginBottom:"70px"}}>If compelled to disclose any of the information by law, the NDA will usually outline certain things that you need to comply with.  Below are some items we usually see, please adjust as you see fit:
    </Typography>
        <div className='preferences-detail-box'>
        <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}  sx={{marginBottom:"28px",marginLeft:"10px"}}>9.If required to disclose by law, are you okay with giving the Company prompt written notice of the requirement the requested disclosure so the company can seek a protective order at their own expense?  This is standard.
    </Typography>
     <div className='preferences-detail-checkbox'>
    <div className='preferences-detail-checkbox-detail'>
    <Vector/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    No
    </Typography>
    </div>
    <div className='preferences-detail-checkbox-detail'>
    <Rectangle/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    Yes
    </Typography>
    </div>
    <div className='input-preferences'>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500} sx={{maxWidth:"1488px",marginLeft:"0px",marginTop:"0px"}}>Additonal Comments</Typography>
    <div className='input-preference'>
    <textarea
            id="commentBox"
          
            value={comments['comment2'] || ''}
            onChange={(e) => handleCommentChange('comment2', e)}
            placeholder="Add comments"
            style={{ width: '100%', height: '150px', padding: '20px', marginTop: '10px' }}
          />
    </div>
    
    </div>
    
    
    
     </div>
    
        </div>
        <div className='preferences-detail-box'>
        <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}  sx={{marginBottom:"28px",marginLeft:"10px"}}>10.Are you okay reasonably complying with the company’s efforts to seek such protective order or other appropriate remedy?  This is standard.
    </Typography>
     <div className='preferences-detail-checkbox'>
    <div className='preferences-detail-checkbox-detail'>
    <Vector/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    No
    </Typography>
    </div>
    <div className='preferences-detail-checkbox-detail'>
    <Rectangle/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    Yes
    </Typography>
    </div>
    
    <div className='input-preference'>
    <textarea
            id="commentBox"
          
            value={comments['comment3'] || ''}
            onChange={(e) => handleCommentChange('comment3', e)}
            placeholder="Add comments"
            style={{ width: '100%', height: '150px', padding: '20px', marginTop: '10px' }}
          />
    </div>
     </div>
    
        </div>
        <div className='preferences-detail-box'>
        <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}  sx={{marginBottom:"28px",marginLeft:"10px"}}>11.If required to disclose by law, are you okay limiting the disclosure to only that which is legally required, as advised by your counsel?
    </Typography>
     <div className='preferences-detail-checkbox'>
    <div className='preferences-detail-checkbox-detail'>
    <Vector/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    No
    </Typography>
    </div>
    <div className='preferences-detail-checkbox-detail'>
    <Rectangle/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    Yes
    </Typography>
    </div>
    
    
    <div className='input-preference'>
    <textarea
            id="commentBox"
            value={comments['comment4'] || ''}
            onChange={(e) => handleCommentChange('comment4', e)}
            
            placeholder="Add comments"
            style={{ width: '100%', height: '150px', padding: '20px', marginTop: '10px' }}
          />
    </div>
     </div>
    
        </div>
        <div className='preferences-detail-box'>
        <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}  sx={{marginBottom:"28px",marginLeft:"10px"}}>12.If it is not already in the document, do you want to add language saying “Nothing herein will preclude either party with complying with any legal requirements?”
    
    </Typography>
     <div className='preferences-detail-checkbox'>
    <div className='preferences-detail-checkbox-detail'>
    <Vector/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    No
    </Typography>
    </div>
    <div className='preferences-detail-checkbox-detail'>
    <Rectangle/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    Yes
    </Typography>
    </div>
    <div className='preferences-detail-checkbox-detail'>
    <Rectangle/>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500}>
    Only redline if other items are being redlined
    </Typography>
    </div>
    
    
     </div>
     <div className='input-preferences'>
    <Typography fontSize={"24px"} color={"#353535"} fontWeight={500} sx={{maxWidth:"1488px",marginLeft:"10px",marginTop:"25px"}}>13.Anything else you want to add to your preferences as it relates to the definition of confidential information?</Typography>
    <div className='input-preference'>
    <textarea
            id="commentBox"
            value={comments['comment5'] || ''}
            onChange={(e) => handleCommentChange('comment5', e)}
            
            placeholder="Add comments"
            style={{ width: '100%', height: '150px', padding: '20px', marginTop: '10px' }}
          />
    </div>
    
    </div>
        </div>
            </>    
    
            
     
    
        </div> 
  );

export default Required
