"""
Generate ALTERNATE gorilla soundtrack as WAV — fast NumPy version
75 seconds, 44100Hz stereo
"""
import numpy as np
import wave, struct, os

SAMPLE_RATE = 44100
TOTAL_SECS  = 75.0
N           = int(SAMPLE_RATE * TOTAL_SECS)

t = np.linspace(0, TOTAL_SECS, N, endpoint=False)

audio = np.zeros(N)

# --- Section 1: 0-15s — wind ambience 60Hz ---
m1 = (t < 15.0)
audio[m1] += 0.05 * np.sin(2 * np.pi * 60 * t[m1])

# --- Section 2: 15-30s — wind + 80Hz thuds every 2s (0.3s each) ---
m2 = (t >= 15.0) & (t < 30.0)
lt2 = t[m2] - 15.0
audio[m2] += 0.05 * np.sin(2 * np.pi * 60 * t[m2])
thud_mask2 = (np.mod(lt2, 2.0) < 0.3)
audio[m2] += thud_mask2 * 0.4 * np.sin(2 * np.pi * 80 * t[m2])

# --- Section 3: 30-45s — wind + heavy impacts every 1.5s ---
m3 = (t >= 30.0) & (t < 45.0)
lt3 = t[m3] - 30.0
audio[m3] += 0.07 * np.sin(2 * np.pi * 60 * t[m3])
impact_mask3 = (np.mod(lt3, 1.5) < 0.4)
audio[m3] += impact_mask3 * 0.6 * np.sin(2 * np.pi * 100 * t[m3])

# --- Section 4: 45-60s — sustained 40Hz rumble ---
m4 = (t >= 45.0) & (t < 60.0)
audio[m4] += 0.08 * np.sin(2 * np.pi * 40 * t[m4])

# --- Section 5: 60-70s — fading wind ---
m5 = (t >= 60.0) & (t < 70.0)
lt5 = t[m5] - 60.0
fade5 = 1.0 - (lt5 / 10.0)
audio[m5] += 0.03 * fade5 * np.sin(2 * np.pi * 60 * t[m5])

# --- Section 6: 70-75s — orchestral swell (120+240+360Hz) ---
m6 = (t >= 70.0)
lt6 = t[m6] - 70.0
fade_in6 = lt6 / 5.0
audio[m6] += fade_in6 * (
    0.3 * np.sin(2 * np.pi * 120 * t[m6]) +
    0.2 * np.sin(2 * np.pi * 240 * t[m6]) +
    0.1 * np.sin(2 * np.pi * 360 * t[m6])
)

# Normalise to safe level
peak = np.max(np.abs(audio))
if peak > 0:
    audio = audio / peak * 0.8  # headroom

# Convert to 16-bit PCM
audio_int16 = (audio * 32767).astype(np.int16)

# Stereo (duplicate L to R)
stereo = np.column_stack([audio_int16, audio_int16])

output_path = r"C:\Users\Nightgalem\clawd\projects\alternate\output\soundtrack.wav"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with wave.open(output_path, 'wb') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLE_RATE)
    wf.writeframes(stereo.tobytes())

size_mb = os.path.getsize(output_path) / 1024 / 1024
print(f"Done! {output_path}")
print(f"Duration: {TOTAL_SECS}s  |  Size: {size_mb:.1f}MB")
