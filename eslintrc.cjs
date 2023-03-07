module.exports = {
    extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint','simple-import-sort'],
    root: true,
    rules:{
        "no-unused-vars":["error",{argsIgnorePatter: "reg|res|next"}],
        "simple-import-sort/imports": "error",
        "simple-import-sort/export": "error"
    }
};