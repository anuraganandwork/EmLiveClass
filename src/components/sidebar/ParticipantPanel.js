import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import useIsHls from "../../hooks/useIsHls";
import MicOffIcon from "../../icons/ParticipantTabPanel/MicOffIcon";
import MicOnIcon from "../../icons/ParticipantTabPanel/MicOnIcon";
import RaiseHand from "../../icons/ParticipantTabPanel/RaiseHand";
import VideoCamOffIcon from "../../icons/ParticipantTabPanel/VideoCamOffIcon";
import VideoCamOnIcon from "../../icons/ParticipantTabPanel/VideoCamOnIcon";
import ToggleModeContainer from "../../interactive-live-streaming/components/ToggleModeListner";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import { nameTructed } from "../../utils/helper";
import { ModeContext } from "../../App";
import ParticipantAddHostIcon from "../../icons/ParticipantTabPanel/ParticipantAddHostIcon";
import { DotsVerticalIcon } from "@heroicons/react/outline";

import { LeaveScreen } from "../screens/LeaveScreen";

// const getDefaultMediaTracks = async ({ mic, webcam, firstTime, setAudioTrack, setSelectedMic, setVideoTrack,setSelectedWebcam }) => {
  
//   if (mic) {
//     try {
//       const audioConstraints = {
//         audio: true,
//       };

//       const stream = await navigator.mediaDevices.getUserMedia(
//         audioConstraints
//       );
//       const audioTracks = stream.getAudioTracks();

//       const audioTrack = audioTracks.length ? audioTracks[0] : null;

//       setAudioTrack(audioTrack);
//       if (firstTime) {
//         setSelectedMic({
//           id: audioTrack?.getSettings()?.deviceId,
//         });
//       }
//     } catch (error) {
//       console.log("Failed to access microphone", error);
//     }
   
//   }

//   if (webcam) {
//     const videoConstraints = {
//       video: {
//         width: 1280,
//         height: 720,
//       },
//     };

//     const stream = await navigator.mediaDevices.getUserMedia(
//       videoConstraints
//     );
//     const videoTracks = stream.getVideoTracks();

//     const videoTrack = videoTracks.length ? videoTracks[0] : null;
//     setVideoTrack(videoTrack);
//     if (firstTime) {
//       setSelectedWebcam({
//         id: videoTrack?.getSettings()?.deviceId,
//       });
//     }
//   }
// };
export function ParticipantListItem({ participantId, raisedHand, removeParticipant }) {
  
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [removeStudent, setRemoveParticipant] = useState(false)
  const {ModeOfEntry, setModeOfEntry} =useContext(ModeContext)
  const [showRequest, setShowRequest] = useState(false)
  
// const mMeetingRef = useRef()
// const mmMeeting = useMeeting()
// useEffect(() => {
//   mMeetingRef.current = mmMeeting;
// }, [mmMeeting]);

  const { micOn, webcamOn, displayName, isLocal, mode, remove,  disableMic, disableWebcam, participant, enableWebcam, enableMic   } = useParticipant(participantId);
  console.log("Participant object:", participant);
  // const abcWeb = mMeetingRef.current?.disableWebcam


  useEffect(() => {
    console.log("webcamOn state changed:", webcamOn);
  }, [webcamOn]);
  const {  toggleWebcam} = useMeeting({
  // onWebcamRequested: ({ accept, reject, participantId }) => {
  //   // callback function to accept the request
  //   accept();

  //   // callback function to reject the request
  //   reject();
  // },
  

  
});
const handleWebcamRequest = ({ participantId, accept, reject }) => {
  
  const userAccepted = window.confirm(` requesting to turn on your webcam. Do you accept?`);
  
  if (userAccepted) {
    accept();
  } else {
    reject();
  }
};
const { meetingId, meeting, localParticipant , onParticipantJoined, } = useMeeting({
  onMeetingJoined : ()=>{console.log("onMeetingJoined");},
  onMeetingLeft : ()=>{},
  onParticipantJoined : ()=>{console.log(" onParticipantJoined", participant);},
  onParticipantLeft : ()=>{},
  onSpeakerChanged : ()=>{},
  onPresenterChanged : ()=>{},
  onRecordingStarted : ()=>{},
  onRecordingStopped : ()=>{},
  onWebcamRequested:handleWebcamRequest
  
});
// onParticipantJoined()
// const disableParticipantWebcam = (participantId) => {
//   const participant = participants?.find((p) => p.id === participantId);
//   if (participant) {
//     participant.disableWebcam();
//   }
// }



const turnOffCamera = async () => {
  try {
    
    await disableWebcam();
    console.log("Attempted to turn off camera");
  } catch (err) {
    console.error("Error turning off camera:", err);
  }
};
    //const {onMicRequested} = useMeeting()
  const isHls = useIsHls();
// console.log("Partui", participant);
// useEffect(() => {
//   console.log("micOn state changed:", micOn);
// }, [micOn]);

  return (
    removeStudent? (<LeaveScreen setIsMeetingLeft={setRemoveParticipant} />):(
    <div  className="mt-2 m-2 p-2 bg-gray-700 rounded-lg mb-0 hover:bg-gray-400"
      style={{}}>
      <div className="flex flex-1 items-center justify-center relative" >
        <div
          style={{
            color: "#212032",
            backgroundColor: "#757575",
          }}
          className="h-10 w-10 text-lg mt-0 rounded overflow-hidden flex relative items-center justify-center"
        >
          {displayName?.charAt(0).toUpperCase()}
        </div>
        <div className="ml-2 mr-1 flex flex-1">
          <p className="text-base text-white overflow-hidden whitespace-pre-wrap overflow-ellipsis" onClick={()=>{}}>
            {isLocal ? "You" : nameTructed(displayName, 15)}
          </p>
        </div>
        {raisedHand && (
          <div className="flex items-center justify-center m-1 p-1">
            <RaiseHand fillcolor={"#fff"} />
          </div>
        )}
        <div className="m-1 p-1" onClick={() => {
  console.log("Current mic state:", micOn);
  // if (micOn) {
  //   console.log("Attempting to disable mic");
  //   disableMic();
  // } else {
  //   console.log("Attempting to enable mic");
   
  // }

  //{micOn ? disableMic() : onMicRequested(participantId,()=>{"Accepted mic request "}, ()=>{console.log("Rejected mic request");}) }
 micOn?  disableMic() : enableMic()
  console.log("Mic action attempted, current state:", micOn);
}}>{micOn ? <MicOnIcon /> : <MicOffIcon />}</div>


  <div className="m-1 p-1" 
    onClick={async () => {
      const answer = window.confirm("Do you want to disable webCam ?")
      if(answer){
        await turnOffCamera();
        console.log("Webcam clicked, new state:", !webcamOn);
      }
    }}
  
  
  >
   {webcamOn ? <VideoCamOnIcon /> : <VideoCamOffIcon />} 
  
</div>
{showRequest && handleWebcamRequest(participantId, ()=>{console.log("acdepted web cam ");}, ()=>{console.log("Rejected webcam");})}

        <div onClick={()=>{if(!isLocal){
      const answer = window.confirm("Do you want to remove this student?")
      if(answer){
        remove()
        setRemoveParticipant(true)
      //  
      }
      else{

      }
      
      
    }}} > <DotsVerticalIcon
                className={` "text-opacity-70"}
              h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              /></div>
              </div>

<div onClick={()=>{
   const answer = window.confirm("Do you want to make this student co-host?")
   if(answer){
    try{
    enableWebcam()
    setShowRequest(true)
    console.log("Enabling the camera");} 
    catch(e){
      console.log("Error in enabling the camera");
    }
 }
else{
  
}


}} > <DotsVerticalIcon
        className={` "text-opacity-70"}
      h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
        aria-hidden="true"
      /></div>
       
        {isHls && (
          <ToggleModeContainer
            participantId={participantId}
            participantMode={mode}
          />
        )}
      </div>
    )
  );
}

export function ParticipantPanel({ panelHeight }) {
  const { leave } = useMeeting();
  const {ModeOfEntry, setModeOfEntry} = useContext(ModeContext)
  const { raisedHandsParticipants } = useMeetingAppContext();
  const mMeeting = useMeeting();
  const participants = mMeeting.participants;

  const sortedRaisedHandsParticipants = useMemo(() => {
    const participantIds = [...participants.keys()];

    const notRaised = participantIds.filter(
      (pID) =>
        raisedHandsParticipants.findIndex(
          ({ participantId: rPID }) => rPID === pID
        ) === -1
    );

    const raisedSorted = raisedHandsParticipants.sort((a, b) => {
      if (a.raisedHandOn > b.raisedHandOn) {
        return -1;
      }
      if (a.raisedHandOn < b.raisedHandOn) {
        return 1;
      }
      return 0;
    });

    const combined = [
      ...raisedSorted.map(({ participantId: p }) => ({
        raisedHand: true,
        participantId: p,
      })),
      ...notRaised.map((p) => ({ raisedHand: false, participantId: p })),
    ];

    return combined;
  }, [raisedHandsParticipants, participants]);

  const filterParticipants = (sortedRaisedHandsParticipants) =>
    sortedRaisedHandsParticipants;

  const part = useMemo(
    () => filterParticipants(sortedRaisedHandsParticipants, participants),

    [sortedRaisedHandsParticipants, participants]
  );

  return (
   
    <div
      className={`flex w-full flex-col bg-gray-750 overflow-y-auto `}
      style={{ height: panelHeight }}
     >
      <div
        className="flex flex-col flex-1"
        style={{ height: panelHeight - 100 }}
      >
        {ModeOfEntry ? (<> {[...participants.keys()].map((participantId, index) => {
          const { raisedHand, participantId: peerId } = part[index];
          return (
            
            <ParticipantListItem
              participantId={peerId}
              raisedHand={raisedHand}
              removeParticipant={()=>{
                //leave()
              }}
            />
          );
        })}</>):(<div><p style={{color:'white', padding:10}}>Only teachers can access this list!</p></div>)}
       
      </div>
    </div>
  );
}
