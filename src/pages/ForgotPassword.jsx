import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, resetPassword } from "../redux/forgotPasswordSlice";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.auth);

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);

    const handleSendOtp = () => {
        dispatch(sendOtp(phone));
        setStep(2);
    };

    const handleVerifyOtp = () => {
        dispatch(verifyOtp({ phone, otp }));
        setStep(3);
    };

    const handleResetPassword = () => {
        dispatch(resetPassword({ phone, newPassword }));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg p-4 w-50">
                <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: "#007BFF" }}>Forgot Password</h2>
                    
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {step === 1 && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter Phone Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="e.g. +233123456789" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" className="w-100" onClick={handleSendOtp} disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Send OTP"}
                            </Button>
                        </Form>
                    )}

                    {step === 2 && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="6-digit OTP" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" className="w-100" onClick={handleVerifyOtp} disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Verify OTP"}
                            </Button>
                        </Form>
                    )}

                    {step === 3 && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="danger" className="w-100" onClick={handleResetPassword} disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ForgotPassword;
