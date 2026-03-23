import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';

export function LoginScreen(): React.JSX.Element {
  const { login, state } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const webInputReset =
    Platform.OS === 'web'
      ? ({
          outline: 'none',
          outlineWidth: 0,
          outlineColor: 'transparent',
          outlineStyle: 'none',
          boxShadow: 'none',
          WebkitBoxShadow: 'none',
          border: 'none',
          WebkitAppearance: 'none',
          appearance: 'none',
          backgroundColor: 'transparent',
        } as any)
      : undefined;

  const handleLogin = useCallback(async (): Promise<void> => {
    setAuthError(null);

    const trimmedEmail = email.trim();
    const emailValidation = validateEmail(trimmedEmail);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) return;

    try {
      await login(trimmedEmail, password);
    } catch {
      setAuthError('Email or password is incorrect');
    }
  }, [email, password, login]);

  const handleEmailChange = useCallback(
    (value: string): void => {
      setEmail(value);
      if (emailError) setEmailError(null);
      if (authError) setAuthError(null);
    },
    [emailError, authError]
  );

  const handlePasswordChange = useCallback(
    (value: string): void => {
      setPassword(value);
      if (passwordError) setPasswordError(null);
      if (authError) setAuthError(null);
    },
    [passwordError, authError]
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.background}>
        <View style={styles.baseLayer} />
        <View style={styles.topGlow} />
        <View style={styles.rightGlow} />
        <View style={styles.bottomWave} />
        <View style={styles.bottomTexture} />
      </View>

      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <View style={styles.brandMark}>
            <View style={styles.brandDot} />
          </View>
          <Text style={styles.brandText}>SoundShelf</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Sign in</Text>

          {authError ? (
            <View style={styles.authErrorBox}>
              <Text style={styles.authErrorText}>{authError}</Text>
            </View>
          ) : null}

          <View style={styles.fieldGroup}>
            <View
              style={[
                styles.inputShell,
                focusedField === 'email' && styles.inputShellFocused,
                emailError && styles.inputShellError,
              ]}
            >
              <MaterialIcons
                name="mail-outline"
                size={18}
                color={COLORS.icon}
                style={styles.leftIcon}
              />
              <TextInput
                style={[styles.input, webInputReset] as any}
                placeholder="Email"
                placeholderTextColor={COLORS.placeholder}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!state.isLoading}
                returnKeyType="next"
                textContentType="emailAddress"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            {emailError ? <Text style={styles.fieldError}>{emailError}</Text> : null}
          </View>

          <View style={styles.fieldGroup}>
            <View
              style={[
                styles.inputShell,
                focusedField === 'password' && styles.inputShellFocused,
                passwordError && styles.inputShellError,
              ]}
            >
              <MaterialIcons
                name="lock-outline"
                size={18}
                color={COLORS.icon}
                style={styles.leftIcon}
              />

              <TextInput
                style={[styles.input, webInputReset] as any}
                placeholder="Password"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!state.isLoading}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                textContentType="password"
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />

              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={18}
                  color={COLORS.icon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.fieldError}>{passwordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.button, state.isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={state.isLoading}
            activeOpacity={0.92}
            accessibilityRole="button"
            accessibilityLabel="Login"
          >
            {state.isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.demoText}>demo@soundshelf.app · 1234</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const COLORS = {
  background: '#EAF0FA',
  backgroundTop: '#F5F8FE',
  backgroundMid: '#E8EEF9',
  backgroundWave: '#D8E3F6',
  backgroundWaveSoft: '#E2EBF9',
  primary: '#2F6FE8',
  primaryDark: '#243A68',
  card: '#FFFFFF',
  border: '#D6DDE9',
  inputBg: '#FBFCFF',
  placeholder: '#8E98AB',
  text: '#23355E',
  icon: '#8E98AB',
  error: '#D74A4A',
  errorBg: '#FDECEC',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  baseLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
  },
  topGlow: {
    position: 'absolute',
    top: -120,
    left: -90,
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: COLORS.backgroundTop,
    opacity: 0.92,
  },
  rightGlow: {
    position: 'absolute',
    top: 90,
    right: -110,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.backgroundMid,
    opacity: 0.45,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 20,
    left: -30,
    right: -30,
    height: 180,
    backgroundColor: COLORS.backgroundWave,
    opacity: 0.45,
    borderTopLeftRadius: 170,
    borderTopRightRadius: 170,
  },
  bottomTexture: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: COLORS.backgroundWaveSoft,
    opacity: 0.35,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 34,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandDot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: COLORS.primary,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
    shadowColor: '#253B67',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  authErrorBox: {
    backgroundColor: COLORS.errorBg,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  authErrorText: {
    color: COLORS.error,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '400',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  inputShell: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 10,
  },
  inputShellFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  inputShellError: {
    borderColor: COLORS.error,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  fieldError: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.error,
  },
  button: {
    marginTop: 8,
    height: 42,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  demoText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.placeholder,
  },
});