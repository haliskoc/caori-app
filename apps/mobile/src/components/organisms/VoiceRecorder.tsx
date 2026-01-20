import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { Mic, MicOff, X, Send } from "lucide-react-native";
import { Text } from "../atoms/Text";
import { THEME } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface VoiceRecorderProps {
    onRecordingComplete: (uri: string, duration: number) => void;
    onCancel: () => void;
    maxDuration?: number; // in seconds
}

// Audio wave visualization bars
const WAVE_BARS = 40;

export function VoiceRecorder({
    onRecordingComplete,
    onCancel,
    maxDuration = 60,
}: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [duration, setDuration] = useState(0);
    const [amplitude, setAmplitude] = useState(0);

    const timerRef = useRef<NodeJS.Timeout>();
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);
    const waveAnimations = useRef(
        Array.from({ length: WAVE_BARS }, () => new Animated.Value(1))
    ).current;

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (animationRef.current) {
                animationRef.current.stop();
            }
            stopRecording();
        };
    }, []);

    // Start recording
    const startRecording = async () => {
        try {
            // Request permissions
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Microphone permission not granted");
                return;
            }

            // Configure audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create recording
            const { recording: newRecording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(newRecording);
            setIsRecording(true);

            // Start duration timer
            timerRef.current = setInterval(() => {
                setDuration((prev) => {
                    if (prev >= maxDuration) {
                        stopAndSend();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);

            // Start wave animation
            startWaveAnimation();
        } catch (error) {
            console.error("Failed to start recording", error);
        }
    };

    // Stop recording
    const stopRecording = async () => {
        if (recording) {
            try {
                await recording.stopAndUnloadAsync();
                setRecording(null);
            } catch (error) {
                console.error("Error stopping recording", error);
            }
        }
        setIsRecording(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        if (animationRef.current) {
            animationRef.current.stop();
        }
        setDuration(0);
    };

    // Stop and send
    const stopAndSend = async () => {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            const status = await recording.getStatusAsync();

            if (uri && status.durationMillis) {
                onRecordingComplete(uri, status.durationMillis / 1000);
            }

            setRecording(null);
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (animationRef.current) {
                animationRef.current.stop();
            }
            setDuration(0);
        } catch (error) {
            console.error("Error processing recording", error);
        }
    };

    // Cancel recording
    const handleCancel = async () => {
        await stopRecording();
        onCancel();
    };

    // Wave animation
    const startWaveAnimation = () => {
        const animations = waveAnimations.map((anim) =>
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1 + Math.random() * 2,
                        duration: 200 + Math.random() * 300,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 200 + Math.random() * 300,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            )
        );

        animationRef.current = Animated.parallel(animations);
        animationRef.current.start();
    };

    // Format duration
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            {/* Recording Status */}
            {isRecording && (
                <View style={styles.statusContainer}>
                    <View style={styles.recordingDot} />
                    <Text style={styles.statusText}>{"Kayıt"}</Text>
                    <Text style={styles.durationText}>{formatDuration(duration)}</Text>
                </View>
            )}

            {/* Wave Visualization */}
            {isRecording && (
                <View style={styles.waveContainer}>
                    {waveAnimations.map((anim, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.waveBar,
                                {
                                    transform: [{ scaleY: anim }],
                                },
                            ]}
                        />
                    ))}
                </View>
            )}

            {/* Controls */}
            <View style={styles.controlsContainer}>
                {!isRecording ? (
                    <>
                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                            activeOpacity={0.7}
                        >
                            <X size={24} color={THEME.colors.text.muted} />
                        </TouchableOpacity>

                        {/* Record Button */}
                        <TouchableOpacity
                            style={styles.recordButton}
                            onPress={startRecording}
                            activeOpacity={0.8}
                        >
                            <Mic size={32} color="#fff" />
                        </TouchableOpacity>

                        {/* Spacer */}
                        <View style={styles.spacer} />
                    </>
                ) : (
                    <>
                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                            activeOpacity={0.7}
                        >
                            <X size={24} color={THEME.colors.semantic.error} />
                        </TouchableOpacity>

                        {/* Stop & Send Button */}
                        <TouchableOpacity
                            style={[styles.recordButton, styles.stopButton]}
                            onPress={stopAndSend}
                            activeOpacity={0.8}
                        >
                            <Send size={28} color="#fff" />
                        </TouchableOpacity>

                        {/* Spacer */}
                        <View style={styles.spacer} />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20,
    },
    recordingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: THEME.colors.semantic.error,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
        color: THEME.colors.semantic.error,
    },
    durationText: {
        fontSize: 16,
        fontWeight: "700",
        color: THEME.colors.text.primary,
        fontFamily: "monospace",
    },
    waveContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        marginBottom: 20,
        gap: 3,
    },
    waveBar: {
        width: 4,
        height: 40,
        backgroundColor: THEME.colors.primary[400],
        borderRadius: 2,
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    cancelButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: THEME.colors.primary[50],
        alignItems: "center",
        justifyContent: "center",
    },
    recordButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: THEME.colors.primary[600],
        alignItems: "center",
        justifyContent: "center",
        shadowColor: THEME.colors.primary[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    stopButton: {
        backgroundColor: THEME.colors.semantic.success,
        shadowColor: THEME.colors.semantic.success,
    },
    spacer: {
        width: 48,
    },
});
