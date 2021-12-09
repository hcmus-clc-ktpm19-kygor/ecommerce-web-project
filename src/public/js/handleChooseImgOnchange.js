
function handleChooseImgOnchange() {
    const img = document.getElementById("image_url").files[0];
    console.log(img.mozFullPath);
    const avatar_url = URL.createObjectURL(img);
    const avatar = document.getElementById("avatar");
    const inputAvatar = document.getElementById("input-avatar");
    avatar.setAttribute("src", avatar_url);
    inputAvatar.setAttribute("value", avatar_url);
}

document.getElementById("image_url").onchange = handleChooseImgOnchange;