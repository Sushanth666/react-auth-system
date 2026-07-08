function PasswordStrength({ strength }) {
  return (
    <div className="mb-5">

      <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">

        <div
          className={`${strength.width} ${strength.bg} h-full rounded-full transition-all duration-500`}
        ></div>

      </div>

      <p className={`mt-2 text-sm font-semibold ${strength.color}`}>
        Password Strength : {strength.text}
      </p>

    </div>
  );
}

export default PasswordStrength;
