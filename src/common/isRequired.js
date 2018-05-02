const isRequired = (name = isRequired('name in isRequired')) => {
    throw new Error(`${name} is required!`);
};


export default isRequired;