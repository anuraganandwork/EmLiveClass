import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import { Constants } from "@videosdk.live/react-sdk";
import React, { useContext, useState } from "react";
import { ModeContext } from "../App";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import { TicketIcon } from "@heroicons/react/solid";
import TimeInput from "./TImeInput";
import ScheduledClassesDialog from "../Classrow";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
  setMeetingMode,
  meetingMode,
}) {
  const [studioCode, setStudioCode] = useState("");
  const [studioCodee, setStudioCodee] = useState("");
  const [studioCodeError, setStudioCodeError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
  const {ModeOfEntry, setModeOfEntry} =useContext(ModeContext)
  const [isOpenSecondDialog, setIsOpenSecondDialog] = useState(false)
  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
const [classTime, setClassTime]= useState('')
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {setIsOpen(false)
    setStudioCodee("")
  }

  const handleChange= (e)=>{
    setClassTime(e.target.value)
  }


  const openSecondDialog = ()=>{
    setIsOpenSecondDialog(true)
  }

  const closeSecondDialog = ()=>{
    setIsOpenSecondDialog(false)
  }
  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
          <p className="text-white text-base">{`Studio code : ${studioCode}`}</p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(studioCode);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={studioCode}
            onChange={(e) => {
              setStudioCode(e.target.value);
            }}
            placeholder={"Enter studio code"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {studioCodeError && (
            <p className="text-xs text-red-600">
              Please enter valid studioCode
            </p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          <button
            disabled={participantName.length < 3}
            className={`w-full ${
              participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
            }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
              } else {
                if (studioCode.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(studioCode);
                } else setStudioCodeError(true);
              }
            }}
          >
            {iscreateMeetingClicked
              ? "Start a meeting"
              : isJoinMeetingClicked &&
                meetingMode === Constants.modes.CONFERENCE
              ? "Join Studio"
              : "Join Streaming Room"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full">
            <button
              className="w-full  text-white px-2 py-3 rounded-xl"
              style={{backgroundColor:"orange"}}
              onClick={async (e) => {
                const studioCode = await _handleOnCreateMeeting();
                setStudioCode(studioCode);
                setIscreateMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
                setModeOfEntry(true)
              }}
            >
              Start a live class
            </button>

            <button
              className="w-full bg-orange-250 text-white px-2 py-3 mt-5 rounded-xl"
              onClick={async (e) => {
                setIsJoinMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
                setModeOfEntry(false)
              }}
            >
              Join as a Participant
            </button>
            <button
              className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                setIsJoinMeetingClicked(true); 
                setMeetingMode(Constants.modes.VIEWER);
              }}
            >
              Join as a Student
            </button>
         ;
           <div className='justify-center w-full'>
          
           <div className="flex space-x-4 py-4 bg-gray-800 rounded-lg">
  <button 
    onClick={openDialog} 
    className="flex-1 py-2 px-4 bg-gray-800 text-orange-500 font-semibold border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out"
    style={{color:'white'}}
  >
    Schedule a live class
  </button>
  <button 
    onClick={() => openSecondDialog()} 
    className="flex-1 py-2 px-4 bg-gray-800 text-orange-500 font-semibold border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out"
    style={{color:'white'}}
  >
    Your scheduled classes
  </button>
      <Dialog isOpen={isOpen} onClose={closeDialog}>
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule a Live Class</h2>
    
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-600 mb-2">Enter Time</p>
      <TimeInput />
    </div>
    
    <button
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out mb-4 !important"
      style={{
        backgroundColor: '#f97316', // Orange-500 color
        color: 'white',
        padding: '12px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'block',
      }}
      onClick={async () => {
        const studioCode = await _handleOnCreateMeeting();
        setStudioCodee(studioCode);
        console.log("Clicked set time in schedule");
      }}
    >
      Generate Meeting ID
    </button>
    
    {studioCodee && (
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 mb-1">Meeting ID:</p>
        <p className="text-lg font-semibold text-orange-500 bg-orange-100 py-2 px-3 rounded-md">
          {studioCodee}
        </p>
        <button
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out  !important"
      style={{
        backgroundColor: '#f97316', // Orange-500 color
        color: 'white',
        padding: '12px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'block',
      }}
      onClick={ () => {
        closeDialog()
        console.log("Clicked set time in schedule");
      }}
    >
      Schedule class
    </button>
      </div>


    )}
    
    <button
      onClick={closeDialog}
      className="mt-6 w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
    >
      Close
    </button>
  </div>
</Dialog>
<ScheduledClassesDialog isOpen={isOpenSecondDialog} onClose={closeSecondDialog} onJoin={()=>{
                setIsJoinMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
                setModeOfEntry(false)
              }}/>
    </div>
           </div>
          </div>
        </div>
      )}
    </div>
  );
}
