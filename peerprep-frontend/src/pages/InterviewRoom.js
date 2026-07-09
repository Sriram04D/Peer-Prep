import React, { useEffect, useRef } from "react";

const InterviewRoom = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnection = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(process.env.REACT_APP_WS_URL);

    peerConnection.current = new RTCPeerConnection();

    const ws = socket.current;
    const pc = peerConnection.current;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.offer) {
          await pc.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );

          const answer = await pc.createAnswer();

          await pc.setLocalDescription(answer);

          ws.send(JSON.stringify({ answer }));
        } else if (data.answer) {
          await pc.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        } else if (data.candidate) {
          try {
            await pc.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          } catch (err) {
            console.error("ICE Candidate Error:", err);
          }
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({
            candidate: event.candidate,
          })
        );
      }
    };

    return () => {
      if (ws) ws.close();
      if (pc) pc.close();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111",
      }}
    >
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "50%",
          objectFit: "cover",
        }}
      />

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{
          width: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default InterviewRoom;