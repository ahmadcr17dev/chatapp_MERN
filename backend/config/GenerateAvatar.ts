const GenerateAvatar = (username: string, gender: 'male' | 'female') => {
    if (gender === 'male') {
        return `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else {
        return `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }
};

export default GenerateAvatar;