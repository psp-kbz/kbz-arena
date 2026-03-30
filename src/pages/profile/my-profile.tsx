import { useState } from "react";
import {
  BadgeCheck,
  Crosshair,
  Gamepad2,
  Medal,
  PencilLine,
  Phone,
  Save,
  ShieldCheck,
  Swords,
  UserRound,
  X,
} from "lucide-react";
import { profile } from "@/mock/arena-data";
import { useUserStore } from "@/stores/user.store";

export default function MyProfilePage() {
  const user = useUserStore((state) => state.user);
  const displayName = user?.fullName?.trim() || profile.name;
  const displayPhone = user?.msisdn?.trim() || profile.phone;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    mlbbIgn: profile.savedGameIds.mlbbIgn,
    mlbbServerId: profile.savedGameIds.mlbbServerId,
    pubgCharacterId: profile.savedGameIds.pubgCharacterId,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      mlbbIgn: profile.savedGameIds.mlbbIgn,
      mlbbServerId: profile.savedGameIds.mlbbServerId,
      pubgCharacterId: profile.savedGameIds.pubgCharacterId,
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <section className="page-stack">
      <div className="page-card profile-hero-card">
        <div className="row-inline">
          <span className="avatar-badge lg">{profile.avatar}</span>
          <div>
            <p className="page-title">{displayName}</p>
            <p className="muted">{displayPhone}</p>
          </div>
        </div>

        <div className="profile-badges mt-16">
          <span className="profile-chip">
            <ShieldCheck size={14} /> KBZPay Verified
          </span>
          <span className="profile-chip">
            <Gamepad2 size={14} /> 2 Games Linked
          </span>
        </div>
      </div>

      <div className="page-card">
        <div className="row-inline">
          <span className="section-icon">
            <UserRound size={16} />
          </span>
          <h3 className="sub-title">Personal Details</h3>
        </div>

        <div className="profile-form-grid mt-16">
          <div className="readonly-info-card">
            <p className="muted">Full Name</p>
            <strong>{displayName}</strong>
          </div>

          <div className="readonly-info-card">
            <p className="muted">Phone Number</p>
            <p className="row-inline readonly-info-value">
              <Phone size={15} /> {displayPhone}
            </p>
          </div>
        </div>
      </div>

      <div className="page-card">
        <div className="row-between">
          <div className="row-inline">
            <span className="section-icon">
              <Gamepad2 size={16} />
            </span>
            <h3 className="sub-title">Saved Game IDs</h3>
          </div>

          <button
            className={`btn ${isEditing ? "btn-ghost" : "btn-solid"}`}
            type="button"
            onClick={() => setIsEditing((current) => !current)}
          >
            <PencilLine size={16} />
            <span>{isEditing ? "Editing" : "Edit"}</span>
          </button>
        </div>

        <div className="game-id-grid mt-16">
          <div className="game-id-card mlbb-card">
            <div className="row-inline game-id-head">
              <span className="game-badge mlbb-badge">
                <Swords size={16} />
              </span>
              <div>
                <p className="sub-title">MLBB</p>
                <p className="muted">Battle profile</p>
              </div>
            </div>

            <div className="profile-form-grid mt-16">
              <label className="field-label">
                IGN
                <input
                  className="field-input"
                  value={formData.mlbbIgn}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleChange("mlbbIgn", event.target.value)
                  }
                />
              </label>

              <label className="field-label">
                Server ID
                <input
                  className="field-input"
                  value={formData.mlbbServerId}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleChange(
                      "mlbbServerId",
                      event.target.value.replace(/\D/g, "").slice(0, 5),
                    )
                  }
                />
              </label>
            </div>
          </div>

          <div className="game-id-card pubg-card">
            <div className="row-inline game-id-head">
              <span className="game-badge pubg-badge">
                <Crosshair size={16} />
              </span>
              <div>
                <p className="sub-title">PUBG</p>
                <p className="muted">Shooter profile</p>
              </div>
            </div>

            <div className="profile-form-grid mt-16">
              <label className="field-label full">
                Character ID
                <input
                  className="field-input"
                  value={formData.pubgCharacterId}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleChange(
                      "pubgCharacterId",
                      event.target.value.replace(/\D/g, ""),
                    )
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="row-actions mt-16">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={handleCancel}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button
              className="btn btn-solid"
              type="button"
              onClick={handleSave}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="page-card">
        <div className="row-inline">
          <span className="section-icon">
            <BadgeCheck size={16} />
          </span>
          <h3 className="sub-title">Account Status</h3>
        </div>

        <div className="profile-status-grid mt-16">
          <div className="team-meta-card">
            <p className="muted">Verification</p>
            <strong>Verified</strong>
          </div>
          <div className="team-meta-card">
            <p className="muted">Linked Games</p>
            <strong>MLBB + PUBG</strong>
          </div>
          <div className="team-meta-card">
            <p className="muted">Profile Badge</p>
            <strong className="row-inline">
              <Medal size={15} /> Arena Ready
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
