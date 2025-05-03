import { Dispute } from "../models/Dispute"
import { Job } from "../models/Job"

interface Email {
    subject: string,
    text: string
}

export const jobCreatedEmail = (job: Job): Email => {
    return {
        subject: `Job created: ${job.title}`,
        text: `You have a new job from ${job.client.profile.fullName}
        <p><b>Job title: </b>${job.title}</p>
        <p><b>Job description: </b>${job.description}</p>
        <p><b>Job location: </b>${job.fullAddress}</p>

        Log into your account to accept or decline the job offer.
        `
    }
}

export const jobResponseEmail = (job: Job): Email => {
    const response = job.accepted ? "accepted" : "declined"

    return {
        subject: `Job ${response}: ${job.title}`,
        text: `Your job offer has been ${response} by ${job.prof.profile.fullName}.
        <p><b>Job title: </b>${job.title}</p>
        <p><b>Job description: </b>${job.description}</p>
        <p><b>Job location: </b>${job.fullAddress}</p>
        `
    }
}


export const jobDisputeEmail = (job: Job, dispute: Dispute): Email => {

    return {
        subject: `Job dispute: ${job.title}`,
        text: `A dispute has been raised for job ${job.title} by ${job.prof.profile.fullName}
        <p><b>Job title: </b>${job.title}</p>
        <p><b>Job description: </b>${job.description}</p>
        <p><b>Job location: </b>${job.fullAddress}</p>
        <p><b>Dispute reason: </b>${dispute.reason}</p>
        <p><b>Dispute description: </b>${dispute.description}</p>
        `
    }
}