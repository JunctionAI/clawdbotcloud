"""
Generate ALTERNATE gorilla soundtrack as WAV
75 seconds, 44100Hz stereo

Design:
  0-15s  (shots 1-3):  wind  60Hz, vol 0.05
  15-30s (shots 4-6):  wind + 80Hz thuds every 2s (0.3s duration each)
  30-45s (shots 7-9):  60Hz wind + 100Hz impacts every 1.5s (0.4s dur), louder
  45-60s (shots 10-12): 40Hz rumble sustained
  60-70s (shots 13-14): 60Hz wind fading out
  70-75s (shot 15):    chord 120+240+360Hz swell
"""
import wave, struct, math, os

SAMPLE_RATE = 44100
CHANNELS    = 2
SAMPLE_WIDTH = 2  # 16-bit
MAX_AMP     = 32767

def make_samples(duration_s):
    n = int(SAMPLE_RATE * duration_s)
    return n

def to_int16(v):
    v = max(-1.0, min(1.0, v))
    return int(v * MAX_AMP)

output_path = r"C:\Users\Nightgalem\clawd\projects\alternate\output\soundtrack.wav"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

total_duration = 75.0
total_samples  = int(SAMPLE_RATE * total_duration)

print(f"Generating {total_duration}s audio @ {SAMPLE_RATE}Hz stereo...")

with wave.open(output_path, 'wb') as wf:
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(SAMPLE_WIDTH)
    wf.setframerate(SAMPLE_RATE)

    for i in range(total_samples):
        t = i / SAMPLE_RATE
        v = 0.0

        if t < 15.0:
            # Section 1: wind ambience 60Hz
            v = 0.05 * math.sin(2 * math.pi * 60 * t)

        elif t < 30.0:
            # Section 2: wind + 80Hz thuds every 2s
            lt = t - 15.0
            v = 0.05 * math.sin(2 * math.pi * 60 * t)
            phase_in_beat = math.fmod(lt, 2.0)
            if phase_in_beat < 0.3:
                v += 0.4 * math.sin(2 * math.pi * 80 * t)

        elif t < 45.0:
            # Section 3: wind + heavy impacts every 1.5s
            lt = t - 30.0
            v = 0.07 * math.sin(2 * math.pi * 60 * t)
            phase_in_beat = math.fmod(lt, 1.5)
            if phase_in_beat < 0.4:
                v += 0.6 * math.sin(2 * math.pi * 100 * t)

        elif t < 60.0:
            # Section 4: sustained low rumble 40Hz
            v = 0.08 * math.sin(2 * math.pi * 40 * t)

        elif t < 70.0:
            # Section 5: fading wind
            lt = t - 60.0
            fade = 1.0 - (lt / 10.0)
            v = 0.03 * fade * math.sin(2 * math.pi * 60 * t)

        else:
            # Section 6: orchestral swell (120+240+360Hz)
            lt = t - 70.0
            fade_in = lt / 5.0  # fade in over 5s
            v = fade_in * (
                0.3 * math.sin(2 * math.pi * 120 * t) +
                0.2 * math.sin(2 * math.pi * 240 * t) +
                0.1 * math.sin(2 * math.pi * 360 * t)
            )

        sample = to_int16(v)
        frame = struct.pack('<hh', sample, sample)  # stereo (L=R)
        wf.writeframes(frame)

        if i % (SAMPLE_RATE * 5) == 0:
            print(f"  {t:.1f}s / {total_duration}s")

print(f"Done! Written to: {output_path}")
