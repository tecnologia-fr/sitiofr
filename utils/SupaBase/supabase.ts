import { createClient } from "@supabase/supabase-js";

const createLeadInSupabase = async (
  lead: {
    name: string;
    company: string;
    email: string;
    motive: string;
    phone: string;
    message: string;
  },
  table: string
) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          name: lead.name,
          company: lead.company,
          email: lead.email,
          motive: lead.motive,
          phone: lead.phone,
          message: lead.message,
        },
      ])
      .select();
    console.log("data", data);
    if (error) {
      console.log("error", error);
    }
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default createLeadInSupabase;
