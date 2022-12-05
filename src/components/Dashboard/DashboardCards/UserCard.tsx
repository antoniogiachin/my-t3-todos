import { useAppSelector } from "../../../store/hooks/hooks";
import { getUser } from "../../../store/slicers/userSlice";
import Image from "next/image";
import { Severity, TheBadge } from "../../UI/TheBadge";

export const UserCard = () => {
  const sessionUser = useAppSelector(getUser);

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <Image
                src={sessionUser.image}
                width={100}
                height={100}
                alt={sessionUser.name + "-profile-pic"}
              />
            </div>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="text-center uppercase">{sessionUser.name}</h2>
          <div className="mt-4 flex flex-col space-y-2 text-center">
            <TheBadge
              label={sessionUser.email}
              severity={Severity.PRIMARY}
              style={{ margin: "auto" }}
            />
            <p className="text-center">
              {/* extras description  */}
              If a dog chews shoes whose shoes does he choose?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
