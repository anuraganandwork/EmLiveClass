import React, { createContext, useEffect, useState } from "react";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";
import { ILSContainer } from "./interactive-live-streaming/ILSContainer";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MeetingAppProvider } from "./MeetingAppContextDef";
import axios from 'axios';
import ScheduledClassesDialog from './Classrow';
import ScheduleALiveClass from "./components/screens/scheduleALiveClass";
import { createMeeting, validateMeeting } from "./api";
import { token as t } from "./keys";

export const ModeContext = createContext()

const getToken = async () => {
  try {
    const response = await axios.get('http://localhost:3000/get-token');
    console.log("Token from api", response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

const App = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(selectedWebcam.id);
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const [ModeOfEntry, setModeOfEntry] = useState(false);
  const [_token, _setToken] = useState("");
  const [isScheduledClassesDialogOpen, setIsScheduledClassesDialogOpen] = useState(true);

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const result = await getToken();
        _setToken(result);
        console.log("Success in generating self generated token", result);
      } catch (e) {
        console.log("Error in taking self generating token", e);
      }
    };

    fetchToken();
    console.log("Self generated token ", _token);
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  const handleJoinScheduledMeeting = async (meetingId) => {
    // const valid = await validateMeeting({
    //   roomId: meetingId,
    //   token: _token,
    // });
    const valid= true
    console.log("Scheduled eoigejgegwe");
    if (valid) {
      setToken(t);
      setMeetingId(meetingId);
      setMeetingStarted(true);
      setIsScheduledClassesDialogOpen(false);
    } else {
      alert("Invalid Meeting Id");
    }
  };

  return (
    <Router>
      <ModeContext.Provider value={{ ModeOfEntry, setModeOfEntry }}>
        {isMeetingStarted ? (
          <MeetingAppProvider
            selectedMic={selectedMic}
            selectedWebcam={selectedWebcam}
            initialMicOn={micOn}
            initialWebcamOn={webcamOn}
          >
            <MeetingProvider
              config={{
                meetingId,
                micEnabled: micOn,
                webcamEnabled: webcamOn,
                name: participantName ? participantName : "TestUser",
                mode: meetingMode,
                multiStream: false,
              }}
              token={token}
              reinitialiseMeetingOnConfigChange={true}
              joinWithoutUserInteraction={true}
            >
              <ILSContainer
                onMeetingLeave={() => {
                  setToken("");
                  setMeetingId("");
                  setParticipantName("");
                  setWebcamOn(false);
                  setMicOn(false);
                  setMeetingStarted(false);
                }}
                setIsMeetingLeft={setIsMeetingLeft}
                selectedMic={selectedMic}
                selectedWebcam={selectedWebcam}
                selectWebcamDeviceId={selectWebcamDeviceId}
                setSelectWebcamDeviceId={setSelectWebcamDeviceId}
                selectMicDeviceId={selectMicDeviceId}
                setSelectMicDeviceId={setSelectMicDeviceId}
                micEnabled={micOn}
                webcamEnabled={webcamOn}
                meetingMode={meetingMode}
                setMeetingMode={setMeetingMode}
              />
            </MeetingProvider>
          </MeetingAppProvider>
        ) : isMeetingLeft ? (
          <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
        ) : (
          <>
            <JoiningScreen
              participantName={participantName}
              setParticipantName={setParticipantName}
              setMeetingId={setMeetingId}
              setToken={setToken}
              setMicOn={setMicOn}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
              setSelectedMic={setSelectedMic}
              setSelectedWebcam={setSelectedWebcam}
              setWebcamOn={setWebcamOn}
              onClickStartMeeting={() => {
                setMeetingStarted(true);
              }}
              startMeeting={isMeetingStarted}
              setIsMeetingLeft={setIsMeetingLeft}
              meetingMode={meetingMode}
              setMeetingMode={setMeetingMode}
              meetingId={meetingId}
            />
            <button 
              onClick={() => setIsScheduledClassesDialogOpen(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              View Scheduled Classes
            </button>
            <ScheduledClassesDialog 
              isOpen={isScheduledClassesDialogOpen}
              onClose={() => {setIsScheduledClassesDialogOpen(false)}}
              onJoin={(id) => handleJoinScheduledMeeting(id)}
            />
          </>
        )}
      </ModeContext.Provider>
      <div>
        <Routes>
          <Route path="schedule" element={<ScheduleALiveClass />} />
        </Routes>
        <nav>
          <Link to="schedule">Schedule A Live Class</Link> 
        </nav>
      </div>
    </Router>
  );
};

export default App;
