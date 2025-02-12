import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authAPI";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "", 
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  // Handle Signup/Login request
  const handleRegistration = async (type) => {
    if (type === "signup" && !signupInput.role) {
      toast.error("Please select a role.");
      return;
    }

    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;

    try {
      await action(inputData).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  // Handle role selection
  const handleRoleSelection = (role) => {
    setSignupInput((prev) => ({ ...prev, role }));
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.message || "Login Failed");
    }
  }, [
    loginIsSuccess,
    registerIsSuccess,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. johndoe@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter a strong password"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-4 flex flex-col items-center">
                <Label className="text-lg font-semibold text-gray-900">
                  Are You:
                </Label>
                <div className="flex space-x-6">
                  <div className="space-y-2 flex flex-col items-center">
                    <button
                      type="button"
                      className={`w-24 h-24 border-2 rounded-xl bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                        signupInput.role === "student"
                          ? "border-blue-500"
                          : "border-black"
                      }`}
                      onClick={() => handleRoleSelection("student")}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBGcp2CGSHdRRZVogLalcXbdrefj4K8pOaQ&s"
                        alt="student"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </button>
                    <span className="text-gray-800 font-medium text-sm">
                      Student
                    </span>
                  </div>

                  <div className="space-y-2 flex flex-col items-center">
                    <button
                      type="button"
                      className={`w-24 h-24 border-2 rounded-xl bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                        signupInput.role === "instructor"
                          ? "border-blue-500"
                          : "border-black"
                      }`}
                      onClick={() => handleRoleSelection("instructor")}
                    >
                      <img
                        src="https://i.pinimg.com/550x/35/7b/64/357b64a7dc396a6924e070406729cb20.jpg"
                        alt="instructor"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </button>
                    <span className="text-gray-800 font-medium text-sm">
                      Instructor
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={loginInput.email}
                onChange={(e) => changeInputHandler(e, "login")}
                required
              />
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={loginInput.password}
                onChange={(e) => changeInputHandler(e, "login")}
                required
              />
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
