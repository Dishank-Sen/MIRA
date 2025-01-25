import sys
import speech_recognition as sr

def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(audio_file) as source:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.record(source)

        return recognizer.recognize_google(audio)

    except sr.UnknownValueError:
        return "Sorry, I couldn't understand the audio."
    except sr.RequestError as e:
        return f"Error with the speech recognition service: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"

if __name__ == '__main__':
    audio_file_path = sys.argv[1]
    transcription = transcribe_audio(audio_file_path)
    print(transcription)
